// 'use client';

// import { useState } from 'react';
// import {
//   fetchWebsiteBlogComments,
//   submitWebsiteBlogComment,
//   type WebsiteBlogComment,
// } from '@/services/blogs.service';

// interface BlogCommentsSectionProps {
//   blogId: string;
//   onCommentSubmitted?: () => void;
// }

// export default function BlogCommentsSection({
//   blogId,
//   onCommentSubmitted,
// }: BlogCommentsSectionProps) {
//   const [comments, setComments] = useState<WebsiteBlogComment[]>([]);
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   async function loadComments() {
//     if (comments.length > 0) return;

//     setLoadingComments(true);
//     try {
//       const response = await fetchWebsiteBlogComments(blogId);
//       const approvedComments = (response.data ?? []).filter((c) => c.isApproved !== false);
//       setComments(approvedComments);
//     } finally {
//       setLoadingComments(false);
//     }
//   }

//   function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   async function handleSubmitComment(e: React.FormEvent) {
//     e.preventDefault();
//     e.stopPropagation();

//     // Validate form
//     if (!formData.name.trim()) {
//       setErrorMessage('Please enter your name');
//       return;
//     }

//     if (!formData.message.trim()) {
//       setErrorMessage('Please enter your comment');
//       return;
//     }

//     setIsSubmitting(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     try {
//       const response = await submitWebsiteBlogComment(blogId, {
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         message: formData.message.trim(),
//       });

//       if (response.success) {
//         setSuccessMessage(response.message || 'Comment submitted successfully!');
//         setFormData({ name: '', email: '', message: '' });

//         // Reset form after a short delay
//         setTimeout(() => {
//           setShowForm(false);
//           setSuccessMessage('');
//         }, 2000);

//         if (onCommentSubmitted) {
//           onCommentSubmitted();
//         }
//       } else {
//         setErrorMessage(response.message || 'Failed to submit comment');
//       }
//     } catch (error) {
//       setErrorMessage(
//         error instanceof Error ? error.message : 'An error occurred while submitting the comment',
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="blog-comments-section">
//       <div className="blog-comments-header">
//         <h3 className="blog-comments-title">Comments ({comments.length})</h3>
//         <button
//           type="button"
//           className="blog-comments-toggle"
//           onClick={() => {
//             loadComments();
//             setShowForm(!showForm);
//           }}
//         >
//           {showForm ? 'Hide' : 'Show Comments'}
//         </button>
//       </div>

//       {showForm && (
//         <>
//           <div className="blog-comments-list">
//             {loadingComments ? (
//               <p className="blog-comments-loading">Loading comments...</p>
//             ) : comments.length === 0 ? (
//               <p className="blog-comments-empty">No comments yet. Be the first to comment!</p>
//             ) : (
//               comments.map((comment, index) => (
//                 <div key={comment.id ?? `comment-${index}`} className="blog-comment-item">
//                   <div className="blog-comment-header">
//                     <strong className="blog-comment-author">{comment.name || 'Guest'}</strong>
//                     {comment.createdAt && (
//                       <span className="blog-comment-date">
//                         {new Date(comment.createdAt).toLocaleDateString()}
//                       </span>
//                     )}
//                   </div>
//                   <p className="blog-comment-text">{comment.message}</p>
//                 </div>
//               ))
//             )}
//           </div>

//           <form className="blog-comment-form" onSubmit={handleSubmitComment}>
//             <h4 className="blog-comment-form-title">Add Your Comment</h4>

//             {errorMessage && <div className="blog-comment-error">{errorMessage}</div>}

//             {successMessage && <div className="blog-comment-success">{successMessage}</div>}

//             <div className="blog-comment-form-group">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name *"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 disabled={isSubmitting}
//                 className="blog-comment-input"
//               />
//             </div>

//             <div className="blog-comment-form-group">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email (optional)"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 disabled={isSubmitting}
//                 className="blog-comment-input"
//               />
//             </div>

//             <div className="blog-comment-form-group">
//               <textarea
//                 name="message"
//                 placeholder="Your Comment *"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 disabled={isSubmitting}
//                 className="blog-comment-textarea"
//                 rows={4}
//               />
//             </div>

//             <button type="submit" disabled={isSubmitting} className="blog-comment-submit-btn">
//               {isSubmitting ? 'Submitting...' : 'Submit Comment'}
//             </button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// }
