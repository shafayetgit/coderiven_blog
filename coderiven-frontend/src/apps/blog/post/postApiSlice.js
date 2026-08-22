import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthRedirect from "@/redux/baseQueryWithAuthRedirect";

const PREFIX = "blog/post";

const postApiSlice = createApi({
  reducerPath: "blog.post.api",
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: ["Post"], // Defined all tag types used in the API
  endpoints: (builder) => ({
    // Post list
    list: builder.query({
      query: ({ page = 1 }) => `${PREFIX}/list?page=${page}`,

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache = { items: [], count: 0 }, newItems, { arg }) => {
        const { page } = arg;

        if (page === 1) {
          return newItems; // Replace cache for page 1
        }

        // Merge new items into the cache
        currentCache.items.push(...newItems.items);
        currentCache.count = newItems.count;
        return currentCache;
      },

      forceRefetch({ currentArg, previousArg }) {
        return !previousArg || currentArg.page !== previousArg.page;
      },
    }),

    // Post detail
    detail: builder.query({
      query: (slug) => `${PREFIX}/detail/${slug}`,
    }),

    // Post comment create
    postCommentCreate: builder.mutation({
      query: ({ slug, data }) => ({
        url: `${PREFIX}/post-comment-create/${slug}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { slug }) => [
        { type: "Post", id: slug },
      ],

      async onQueryStarted({ slug, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistically update the post detail cache
        const patchDetail = dispatch(
          postApiSlice.util.updateQueryData("detail", slug, (draft) => {
            if (draft) {
              draft.total_comments += 1;
            } else {
              console.warn(`Cache miss for detail query with slug: ${slug}`);
            }
          })
        );

        // Update the post list cache manually
        const patchList = dispatch(
          postApiSlice.util.updateQueryData("list", { page: 1 }, (draft) => {
            const post = draft.items?.find((p) => p.slug === slug);
            if (post) {
              post.total_comments += 1;
            }
          })
        );
        // console.log("befor draft");
        // Update the post-comment list cache manually
        const patchPostCommentList = dispatch(
          postApiSlice.util.updateQueryData("postCommentList", slug, (draft) => {
            // console.log(patch)
            // console.log(draft.push(patch.data));
            // if (draft) {
            //   draft.total_comments += 1;
            // } else {
            //   console.warn(`Cache miss for detail query with slug: ${slug}`);
            // }
          })
        );

        try {
          // Wait for the mutation to complete
          await queryFulfilled;
        } catch (error) {
          console.error("Failed to post comment:", error);

          // Rollback optimistic update on failure
          patchDetail.undo();
          patchList.undo();
          patchPostCommentList.undo();
        }
      },
    }),

    // Post comment list
    postCommentList: builder.query({
      query: (slug) => `${PREFIX}/post-comment-list/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Post", id: slug }],
    }),

    // Post like or dislike
    postLikeOrDislike: builder.mutation({
      query: (slug) => ({
        url: `${PREFIX}/post-like-or-dislike/${slug}`,
        method: "POST",
      }),
      async onQueryStarted(slug, { dispatch, queryFulfilled }) {
        // Apply optimistic updates to the cache
        const patchListResult = dispatch(
          postApiSlice.util.updateQueryData("list", { page: 1 }, (draft) => {
            const post = draft.items?.find((p) => p.slug === slug);
            if (post) {
              post.has_user_liked = !post.has_user_liked;
              post.total_likes += post.has_user_liked ? 1 : -1;
            }
          })
        );

        const patchDetailResult = dispatch(
          postApiSlice.util.updateQueryData("detail", slug, (draft) => {
            if (draft) {
              draft.has_user_liked = !draft.has_user_liked;
              draft.total_likes += draft.has_user_liked ? 1 : -1;
            }
          })
        );

        try {
          await queryFulfilled; // Wait for the mutation to succeed
        } catch (error) {
          // Undo optimistic updates if the mutation fails
          patchListResult.undo();
          patchDetailResult.undo();
          console.error("Failed to update cache:", error);
        }
      },
    }),
  }),
});

export const {
  useListQuery,
  useDetailQuery,
  usePostCommentCreateMutation,
  usePostCommentListQuery,
  usePostLikeOrDislikeMutation,
} = postApiSlice;

export default postApiSlice;
