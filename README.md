# 안다미로 직원관리 V7

## 이번 버전 핵심
- 홈페이지가 `/api/masterdb` 서버 프록시를 통해 Apps Script를 읽습니다.
- 브라우저 CORS 문제를 피합니다.
- MASTER_DB V6 시트 ID가 Apps Script에 고정되어 있습니다.
- 직원관리/휴무입력/근무인원/보건증/인센티브요약을 실제로 읽습니다.

## 적용 순서
1. `apps-script.js` 내용을 Apps Script에 전체 교체
2. 저장 후 배포 관리에서 새 버전 배포
3. 이 폴더 파일 전체를 기존 GitHub `andamiro-staff` 폴더에 덮어쓰기
4. GitHub Desktop에서 commit & push
5. Vercel 자동 배포 완료 후 홈페이지 새로고침
