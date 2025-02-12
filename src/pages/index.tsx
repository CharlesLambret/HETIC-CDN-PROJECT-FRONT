import Router from "next/router";

export default function Home() {
  const handleButtonClick = () => {
    Router.push('/auth/login');
  };

  return (
    <div className="w-2/3 mx-auto min-h-screen" >
      <div className="relative w-5/6 mx-auto rounded-lg ">
      <div className="relative rounded-lg flex flex-col items-start justify-end p-20 text-white w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.usegalileo.ai/sdxl10/6e02d50d-f165-4058-b64c-8b8d1ed14e64.png')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 z-10"></div>
        <div className="relative z-20">
          <h1 className="text-xl font-bold py-5">Gérer tous vos fichiers au même endroit</h1>
          <p className="text-base py-5">Notre gestionnaire de fichiers est une plateforme de gestion de fichiers qui vous permet de stocker, organiser et partager tous vos fichiers en un seul endroit.</p>
          <button
            onClick={handleButtonClick}
            className="bg-gray-800 hover:bg-blue-600 w-1/5 font-bold py-2 px-4 rounded"
          >
            Démarrer
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
}
