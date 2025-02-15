import { notFound } from "next/navigation";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";

// 보통의 경우 api를 호출하기떄문에 fetch를 많이 사용한다
// fetch는 next15 부터 자동캐싱지원이 되지 않는다
// 특정 fetch 요청을 캐시에 포함시키려면 cache: 'force-cache' 옵션을 사용한다.
async function getProduct(id: number) {
  fetch("https://api.com", {
    next: {
      revalidate: 60,
      tags: ["hello"],
    },
  });
}

/* unstable_cache를 통해 캐싱을 한다
    revalidate 를 통해 캐시 갱신 주기이다.
    tags를 통해 이 화면에서 캐시를 개별적으로 다룰 수 있다.
*/
const getCachedProduct = nextCache(getProduct, ["product-detail"], {
  revalidate: 60, // 60초 동안 캐시를 유지하고 그 이후 에 갱신한다
  tags: ["product-detail", "hello"],
});

// DB를 호출하는 복잡한 로직의 경우 unstable_cache를 사용한다.
/**
 *   fetch()를 직접 호출하지 않는 함수를 캐싱할 때
    같은 데이터를 여러 번 가져와야 할 때
    성능 최적화를 위해 재사용 가능한 데이터를 캐싱할 때
 */
async function getProductTitle(id: number) {
  //   console.log("title");
  //   const product = await db.product.findUnique({
  //     where: {
  //       id,
  //     },
  //     select: {
  //       title: true,
  //     },
  //   });
  //   return product;
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title", "xxxx"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));
  return {
    // title: product?.title,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getCachedProduct(id);

  const revalidate = async () => {
    "use server";
    // 해당경로에서 (=/home) 캐시를 새로고침 하라는뜻!
    revalidatePath("/home");
    // 해당 태그인 캐시를 새로고침 한다
    revalidateTag("xxxx");
  };

  return <div className="pb-40"></div>;
}
