import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, postReview } from "../../store/slices/productSlice";
import { Star } from "lucide-react";

const ReviewsContainer = ({ product, productReviews }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { isReviewDeleting, isPostingReview } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("rating", rating);
    data.append("comment", comment);
    dispatch(postReview({ productId: product.id, review: data }));
    setComment("");
  };

  return (
    <>
      {authUser && (
        <form onSubmit={handleReviewSubmit} className="mb-8 space-y-4">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Leave a Review</h4>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => {
              const isFilled = i < rating;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`Select ${i + 1} stars`}
                >
                  <Star
                    className={`w-7 h-7 ${
                      isFilled
                        ? "text-amber-500 fill-amber-400 drop-shadow-sm"
                        : "text-amber-400 fill-amber-50 stroke-[1.8] dark:fill-amber-950/20"
                    }`}
                  />
                </button>
              );
            })}
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 ml-2">
              {rating} / 5 Stars
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Write your review..."
            className="w-full p-4 rounded-xl border-2 border-slate-300 dark:border-border bg-white dark:bg-background text-slate-900 dark:text-foreground text-sm font-medium focus:border-amber-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPostingReview}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold hover:glow-on-hover animate-smooth disabled:opacity-50"
          >
            {isPostingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <h3 className="text-2xl font-serif font-black text-slate-900 dark:text-white mb-6">
        Customer Reviews
      </h3>
      {productReviews && productReviews.length > 0 ? (
        <div className="space-y-6">
          {productReviews.map((review) => {
            return (
              <div key={review.review_id} className="glass-card p-6 border-2 border-slate-200/80 dark:border-border/50 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.reviewer?.avatar?.url || "/avatar-holder.avif"}
                    alt={review?.reviewer?.name}
                    className="w-12 h-12 rounded-full text-foreground border border-slate-300 dark:border-border object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">
                        {review?.reviewer?.name}
                      </h4>
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => {
                          const isFilled = i < Math.floor(review.rating);
                          return (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                isFilled
                                  ? "text-amber-500 fill-amber-400 drop-shadow-xs"
                                  : "text-amber-400 fill-amber-100/60 stroke-[1.5] dark:fill-amber-950/20"
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-base font-medium text-slate-800 dark:text-slate-200 mb-2 leading-relaxed">
                      {review.comment}
                    </p>
                    {authUser?.id === review.reviewer?.id && (
                      <button
                        onClick={() =>
                          dispatch(
                            deleteReview({
                              productId: product.id,
                              reviewId: review.review_id,
                            })
                          )
                        }
                        className="my-6 w-fit flex items-center space-x-3 p-3 rounded-lg glass-card hover:glow-on-hover text-destructive hover:text-destructive-foreground group"
                      >
                        {isReviewDeleting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                            <span>Deleting Review...</span>
                          </>
                        ) : (
                          <span>Delete Review</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
          No reviews yet. Be the first one to review this product.
        </p>
      )}
    </>
  );
};

export default ReviewsContainer;
