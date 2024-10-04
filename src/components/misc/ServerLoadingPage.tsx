import Icon from "@/components/common/Icon";

export default function ServerLoadingPage() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-background dark">
      <Icon
        name="spinner-2"
        size={128}
        className="text-secondary animate-spin duration-1000"
      />
    </div>
  );
}
