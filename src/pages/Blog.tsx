import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blog";

const BlogSEO = () => (
	<>
		<title>Blog | GoodAV - Africa's Creative Industries & Audiovisual Leadership</title>
		<meta name="description" content="Explore Africa's booming creative industries, Rwanda's audiovisual leadership, and global appeal. Read expert insights, news, and tips on GoodAV's blog." />
		<link rel="canonical" href="https://goodav.net/blog" />
		<meta property="og:title" content="Blog | GoodAV - Africa's Creative Industries & Audiovisual Leadership" />
		<meta property="og:description" content="Explore Africa's booming creative industries, Rwanda's audiovisual leadership, and global appeal." />
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://goodav.net/blog" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Blog | GoodAV - Africa's Creative Industries & Audiovisual Leadership" />
		<meta name="twitter:description" content="Explore Africa's booming creative industries, Rwanda's audiovisual leadership, and global appeal." />
		<meta name="robots" content="index, follow" />
		<meta httpEquiv="Content-Language" content="en" />
		{/* Structured Data */}
		<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Blog",
			"name": "GoodAV Blog",
			"url": "https://goodav.net/blog"
		}) }} />
	</>
);

const Blog: React.FC = () => (
		<main role="main" aria-label="Blog" className="max-w-5xl mx-auto p-4">
			<BlogSEO />
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
