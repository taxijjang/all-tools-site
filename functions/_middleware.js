// Cloudflare Pages는 프로젝트마다 *.pages.dev 주소를 항상 공개한다. 그래서
// 사이트 전체가 taxijjang.com 과 all-tools-site.pages.dev 두 곳에 똑같이 존재했다.
//
// canonical 태그는 처음부터 taxijjang.com 을 가리키고 있었는데도 구글이 그걸
// 무시하고 pages.dev 를 정본으로 골랐다. 서치콘솔 URL 검사에 그대로 찍혀 있다:
//   사용자 선언 표준 URL      https://taxijjang.com/en/
//   Google에서 선택한 표준 URL  https://all-tools-site.pages.dev/
// 그 결과 /en/ 과 / 이 "중복 페이지"로 묶여 색인에서 빠졌다.
//
// canonical 은 힌트일 뿐이라 같은 내용이 두 호스트에서 200으로 응답하면
// 구글이 다른 판단을 할 수 있다. 호스트 단위로 막아야 한다.
// _redirects 와 _headers 는 경로만 매칭하고 호스트 조건을 못 쓴다.

const PRODUCTION_HOST = 'taxijjang.com';
const PAGES_DEV_SUFFIX = '.pages.dev';

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (!url.hostname.endsWith(PAGES_DEV_SUFFIX)) {
    return context.next();
  }

  // 배포 미리보기(<해시>.all-tools-site.pages.dev)는 배포 확인에 쓰므로
  // 접근은 살려두고 색인만 막는다. 운영 주소는 아예 정본으로 넘긴다.
  const isPreview = url.hostname.split('.').length > 3;

  if (!isPreview) {
    url.hostname = PRODUCTION_HOST;
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  // 204/304 는 본문을 가질 수 없다. 그대로 넘기면 Response 생성이 throw 한다.
  const body = response.status === 204 || response.status === 304 ? null : response.body;
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
