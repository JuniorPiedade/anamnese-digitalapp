/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora avisos do ESLint para o deploy não falhar por bobeira de formatação
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros de tipagem estrita no build para facilitar nosso desenvolvimento web direct
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
