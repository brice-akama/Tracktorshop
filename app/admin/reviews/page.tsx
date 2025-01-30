"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

type Review = {
  _id: string;
  reviewerName: string;
  reviewText: string;
  rating: number;
  productId: string;
  createdAt: string;
};

const AdminReviewsPanel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId"); // Optional: Filter reviews by product ID

  // Fetch reviews from the API
  const fetchReviews = async () => {
    setIsLoading(true); // Start loading
    try {
      const endpoint = productId ? `/api/reviews?productId=${productId}` : "/api/reviews";
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews);
      } else {
        toast.error(data.message || "Failed to load reviews");
      }
    } catch (error) {
      toast.error("Error fetching reviews");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchReviews(); // Call fetchReviews on component load and when productId changes
  }, [productId]);

  // Handle review update
const updateReview = async (reviewId: string, updatedReview: Partial<Review>) => {
  try {
    const response = await fetch(`/api/reviews`, {
      method: "PUT",
      body: JSON.stringify({ reviewId, ...updatedReview }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Review updated successfully");

      // Update the review in state without re-fetching all reviews
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, ...updatedReview, updatedAt: new Date().toISOString() } : review
        )
      );
    } else {
      toast.error(data.message || "Failed to update review");
    }
  } catch (error) {
    toast.error("Error updating review");
  }
};


  // Handle review deletion
  const deleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await fetch(`/api/reviews`, {
        method: "DELETE",
        body: JSON.stringify({ reviewId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Review deleted successfully");
        fetchReviews(); // Fetch updated reviews
      } else {
        toast.error(data.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error("Error deleting review");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Reviews Panel</h1>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-300">Reviewer</th>
              <th className="p-2 border border-gray-300">Review Text</th>
              <th className="p-2 border border-gray-300">Rating</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300">{review.reviewerName}</td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="text"
                    defaultValue={review.reviewText}
                    className="w-full p-1 border border-gray-300 rounded"
                    onBlur={(e) => updateReview(review._id, { reviewText: e.target.value })}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <input
                    type="number"
                    defaultValue={review.rating}
                    min={1}
                    max={5}
                    className="w-16 p-1 border border-gray-300 rounded"
                    onBlur={(e) => updateReview(review._id, { rating: Number(e.target.value) })}
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    onClick={() =>
                      updateReview(review._id, { reviewText: review.reviewText, rating: review.rating })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => deleteReview(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReviewsPanel;
