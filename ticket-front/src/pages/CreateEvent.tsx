import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { Loader2, Lock } from "lucide-react";
import { CreateMarketForm } from "../components/layout/CreateEventForm";

export default function CreateEvent() {
  const account = useCurrentAccount();
  const ADMIN_CAP_TYPE = `${
    import.meta.env.VITE_CONTRACT_ID
  }::ticket::AdminCap`;

  const { data: ownedObjects, isPending } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address || "",
      filter: { StructType: ADMIN_CAP_TYPE },
      options: { showType: true } // Boa prática
    },
    {
      enabled: !!account, // Só busca se tiver carteira conectada
      refetchOnWindowFocus: true // Se trocar de carteira, atualiza na hora
    }
  );

  const adminCap = ownedObjects?.data?.[0]?.data?.objectId;
  console.log("AdminCap: ", adminCap);
  const isAdmin = !!adminCap;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center my-8">
        {!account && (
          <div className="text-center p-10 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Conecte sua Carteira</h2>
            <p className="text-gray-500">
              Você precisa estar conectado para acessar esta área.
            </p>
          </div>
        )}

        {/* CASO 2: Carregando Verificação */}
        {account && isPending && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-blue-500" />
            <p>Verificando permissões de administrador...</p>
          </div>
        )}

        {/* CASO 3: Conectado, mas NÃO é Admin */}
        {account && !isPending && !isAdmin && (
          <div className="max-w-md w-full p-6 bg-red-50 border border-red-200 rounded-xl text-center">
            <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Acesso Negado
            </h2>
            <p className="text-red-600 mb-4">
              Sua carteira <strong>não possui o AdminCap</strong>.
            </p>
            <p className="text-sm text-gray-500 bg-white p-2 rounded border border-gray-200 font-mono break-all">
              Logado como: {account.address}
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Esta área é restrita apenas para a criação de novos mercados.
            </div>
          </div>
        )}

        {/* CASO 4: É ADMIN (Sucesso) */}
        {account && !isPending && isAdmin && adminCap && (
          <div className="w-full max-w-2xl mx-2">
            <div className="mb-4 p-2 bg-green-200 text-green-800 text-xs rounded text-center">
              🔓 Modo Administrador Ativo (Cap ID: {adminCap.slice(0, 6)}...)
            </div>
            <CreateMarketForm adminCap={adminCap} />
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
