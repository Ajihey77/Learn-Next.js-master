import TabBar from "@/components/tab-bar";

// ()폴더명을 사용하여 라우딩에 영향받지 않고 그룹화할때 사용
// 이런식으로 할 경우 layout이 해당 폴더에서만 적용되고 다른 폴더의 layout에 영향을 받지 않는다.
export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
