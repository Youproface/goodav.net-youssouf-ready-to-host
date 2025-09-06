import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blog";
import SEO from "../components/SEO";

const Blog: React.FC = () => (
		<main role="main" aria-label="Blog" className="max-w-5xl mx-auto p-4">
			<SEO
				title="Blog Archive | GoodAV - Africa's Creative Industries & Audiovisual Insights"
				description="Discover the latest insights on Africa's booming creative economy, Rwanda's audiovisual leadership, and innovative storytelling. Expert analysis on creative industries, technology trends, and African innovation."
				keywords="Africa creative industries blog, Rwanda audiovisual insights, African storytelling trends, creative economy analysis, audiovisual innovation Africa, Rwanda development blog, African media industry, creative technology Africa, audiovisual trends Rwanda, African creative leadership"
				canonical="https://goodav.net/blog"
				type="website"
			/>
			<header>
				<h1 className="text-4xl font-bold mb-4" id="blog-list-title">GoodAV Blog</h1>
				<p className="mb-8 text-lg text-gray-700">Africa's creative industries, Rwanda's audiovisual leadership, and global insights.</p>
			</header>
			<section aria-labelledby="blog-list-title">
				<ul className="space-y-8">
					{blogPosts.map(post => {
						const blogImage = `/images/all_site_images/Blog/blog-${post.id}.jpg`;
						return (
							<li key={post.id} className="bg-white rounded-lg shadow-md p-6" aria-labelledby={`post-title-${post.id}`}> 
								<article>
									<img src={blogImage} alt={post.title} loading="lazy" decoding="async" className="w-full h-48 object-cover rounded" />
									<h2 id={`post-title-${post.id}`} className="text-2xl font-semibold mt-4 mb-2">
										<Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline focus:outline focus:ring-2 focus:ring-blue-400">{post.title}</Link>
									</h2>
									<time dateTime={post.date} className="block text-sm text-gray-500 mb-2">{post.date}</time>
									<p className="text-gray-800 mb-4">{post.excerpt}</p>
									<Link to={`/blog/${post.slug}`} className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline focus:ring-2 focus:ring-blue-400" aria-label={`Read more: ${post.title}`}>Read More</Link>
								</article>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
);

export default Blog;
