export const TextArea = ({ response }: { response: string }) => {
  return (
    <div className="w-1/2 min-h-60 bg-slate-200 p-8 rounded-2xl">
      <p className="mb-2 font-medium">respuesta: </p>
      <p>{response === '' ? '...' : response}</p>
    </div>
  );
};
