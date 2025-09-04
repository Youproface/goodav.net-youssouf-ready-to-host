import React from 'react';
import SEO from './SEO';

const HomePage: React.FC = () => {
	return (
		<>
			<SEO
				title="GoodAV - World-Class Audiovisual Agency | Rwanda, Africa, Documentary, Conferences, Visit Rwanda, Conversion Experts"
				description="GoodAV is a world-class, professional audiovisual partner for Rwanda, Africa, and global clients. We deliver exceptional results for conferences, documentaries, tourism, Kigali Convention Center, Visit Rwanda, Kwita Izina gorilla naming, Rwanda visa, national parks, and more. Our expertise drives engagement, customer conversion, and international recognition."
				keywords="Rwanda, Africa, documentary, conversion, Kigali Convention Center, Visit Rwanda, conference in Rwanda, Kwita Izina, gorilla naming, Rwanda visa, Rwandan national park, Rwanda Convention Bureau, audiovisual industry Rwanda, Trust Partner Rwanda, event media coverage, video production Rwanda, live streaming Rwanda, tourism Rwanda, international conference Rwanda, creative economy Rwanda, NGO storytelling Rwanda, African creative industries, cultural preservation Rwanda, pan-African media agency, impact storytelling Rwanda, professional media coverage, global events Rwanda, tourism investment Rwanda, e-learning Rwanda, documentary filmmaking Rwanda, branding Rwanda, high-quality video editing, media production Rwanda, creative direction Rwanda, audiovisual innovation Rwanda, world-class audiovisual, professional media, customer conversion, global impact, international events, Africa documentary, Rwanda documentary, Kigali events, Africa conferences, Rwanda conferences, Africa tourism, Rwanda tourism, Africa branding, Rwanda branding, Africa creative, Rwanda creative"
				canonical="https://goodav.net/"
			/>
			<main className="homepage-main">
				<section className="hero-section">
					<h1 className="text-4xl font-bold gradient-text mb-4">World-Class Audiovisual Production in Rwanda & Africa</h1>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						GoodAV is your trusted partner for professional video production, live streaming, photography, and documentary filmmaking. We empower brands, organizations, and events to achieve global impact and customer conversion through creative excellence.
					</p>
					<ul className="seo-keywords-list text-sm mb-6">
						<li>Rwanda & Africa Conferences</li>
						<li>Documentary Filmmaking</li>
						<li>Event Media Coverage</li>
						<li>Tourism & Branding</li>
						<li>Kwita Izina Gorilla Naming</li>
						<li>Kigali Convention Center</li>
						<li>NGO Storytelling</li>
						<li>Customer Conversion</li>
					</ul>
					<a href="/contact" className="cta-button bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold shadow-glow transition-all duration-300">Start Your Project</a>
				</section>
				<section className="featured-section mt-12">
					<h2 className="text-2xl font-bold mb-4">Why Choose GoodAV?</h2>
					<ul className="list-disc ml-6 text-base">
						<li>Global recognition for documentary and event coverage</li>
						<li>Professional team with deep expertise in Africa</li>
						<li>Cutting-edge equipment and creative direction</li>
						<li>Proven results in customer engagement and conversion</li>
						<li>Trusted by international organizations and brands</li>
					</ul>
				</section>
			</main>
		</>
	);
};

export default HomePage;
