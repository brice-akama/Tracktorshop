"use client";

import { useEffect, useState } from "react";

interface Review {
  reviewerName: string;
  reviewText: string;
  rating: number;
  createdAt: string;
}

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?productId=${productId}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg">{review.reviewerName}</h3>
            <div className="flex items-center">
              {/* Display rating stars */}
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2">{review.reviewText}</p>
            <p className="text-gray-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
