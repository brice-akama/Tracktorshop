'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

type ReviewFormProps = {
  productId: string;
};

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0); // Rating can be from 0 to 5
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reviewData = { productId, reviewerName: name, reviewText: content, rating };

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // Display success notification
        toast.success("Review submitted successfully!");
        
        // Reset form
        setName('');
        setContent('');
        setRating(0);
      } else {
        // Display error notification for failed submission
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      // Display error notification for network issues
      toast.error("Error submitting review. Please try again.");
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Write a Review</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
            placeholder="Enter your name"
          />
        </div>

        {/* Rating (Stars) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                className={`w-8 h-8 ${index < rating ? 'text-yellow-500' : 'text-gray-400'} cursor-pointer`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
            placeholder="Write your review here"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
