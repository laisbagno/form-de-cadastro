import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema } from "./schemas";
import type { ClienteFormData } from "./schemas";
import { api } from "./services/api";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }, reset,
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    mode: "onBlur"
  });

  const onSubmit = async (data: ClienteFormData) => {
    const cpfLimpo = data.cpf.replace(/\D/g, "");
    const payload = { ...data, cpf: cpfLimpo };
  
    setIsLoading(true);
  
    try {
      await api.post("/clientes", payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Cliente cadastrado com sucesso!");
      reset({
        nome: "",
        cpf: "",
        email: "",
        corPreferida: undefined,
        observacoes: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(error.response.data.message
          );
        } else {
          toast.error("Ocorreu um erro ao cadastrar o cliente.");
        }
      } else {
        toast.error("Erro inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo!</h1>
        <p className="text-lg text-center">Cadastre seus clientes de forma rápida e segura.</p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Cadastro de Cliente</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("nome")}
              type="text"
              placeholder="Nome Completo"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}

            <input
              {...register("cpf")}
              type="text"
              placeholder="CPF"
              maxLength={14}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, "$1.$2");
                if (value.length > 6) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
                if (value.length > 9) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
                e.target.value = value;
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}

            <input
              {...register("email")}
              type="email"
              placeholder="E-mail"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <div className="space-y-2">
              <p className="font-medium">Cor Preferida</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Vermelho", color: "bg-red-500", value: "vermelho" },
                  { label: "Laranja", color: "bg-orange-500", value: "laranja" },
                  { label: "Amarelo", color: "bg-yellow-400", value: "amarelo" },
                  { label: "Verde", color: "bg-green-500", value: "verde" },
                  { label: "Azul", color: "bg-blue-500", value: "azul" },
                  { label: "Violeta", color: "bg-purple-500", value: "violeta" },
                ].map((cor) => (
                  <label
                    key={cor.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      {...register("corPreferida")}
                      type="radio"
                      value={cor.value}
                      className="peer hidden"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border border-gray-300 ${cor.color} peer-checked:ring-2 peer-checked:ring-offset-2`}
                    ></span>
                    <span>{cor.label}</span>
                  </label>
                ))}
              </div>
              {errors.corPreferida && (
                <p className="text-red-500 text-sm">{errors.corPreferida.message}</p>
              )}
            </div>

            <textarea
              {...register("observacoes")}
              placeholder="Observações"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg px-3 py-2 font-semibold transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {isLoading && (
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isLoading ? "Enviando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
