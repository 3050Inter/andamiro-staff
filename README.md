# 안다미로 직원관리 홈페이지

이 폴더가 GitHub/Vercel에 올릴 최종 폴더입니다.

## 현재 연결 API
Apps Script URL은 `.env.local`과 `.env.example`에 이미 입력되어 있습니다.

## 올리는 순서
1. 이 폴더 전체를 GitHub 새 저장소에 업로드
2. Vercel에서 New Project → 해당 저장소 Import
3. Environment Variables에 아래 값 추가

NEXT_PUBLIC_API_URL=https://script.google.com/macros/s/AKfycbyLvZuw7BMOSbrduepivYtGNzp_EWvk4MyRcAbFKGlKFA4weKz4_8O_aDpuFFeH5az3-g/exec

4. Deploy

## 주의
기존 3050 저장소에 올리지 말고 새 저장소를 사용하세요.
