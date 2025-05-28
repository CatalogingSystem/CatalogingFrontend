export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="loading loading-spinner loading-xl"/>
      <p>Cargando</p>
    </div>
  );
}