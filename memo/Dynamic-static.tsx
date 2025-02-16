// generateStaticParams으로 처리한 페이지 외의 경우 dynamicParams을 통해 옵션을 줄 수 있다.
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export const dynamicParams = true; // true의 경우 위에서 지정하지 않은 페이지에 대해 동적으로 처리한다.

export default function UserProfile({ params }: { params: { id: string } }) {
  return <h1>사용자 프로필: {params.id}</h1>;
}

/**
 * - 사용이유
 *  정적 처리를 통해 DB호출을 줄이고 렌더링없이 html로 사용자에게 제공할 수 있다.
 *
 * - 예시
 * 동적페이지를 정적페이지로 바꿀일이 생각보다 많이 없을것같지만 예시를 들어보면
 * 상품 상세 페이지 (일부 상품만 미리 정적 생성하고, 나머지는 SSR 처리)
 * 일부 페이지는 정적 생성, 일부는 SSR 처리 (미리 정해지지 않은 경로)
 * 일부 사용자 프로필만 정적 생성
 */
