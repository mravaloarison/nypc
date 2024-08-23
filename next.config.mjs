/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.map$/,
			use: "ignore-loader", // or 'null-loader' if necessary
		});

		return config;
	},
};

export default nextConfig;
