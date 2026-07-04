# 안다미로 직원관리 V14 - 공지사항

## 추가 내용
- 메뉴에 `공지사항` 추가
- Dashboard 상단에 최신 공지 5개 표시
- 공지 작성/저장 기능
- 공지 삭제 기능
- MASTER_DB에 `공지사항` 시트 자동 생성
- 공지 컬럼: 작성일, 제목, 내용, 작성자, 입력시간
- 여름휴가 일정 등 자유롭게 작성 가능

## 적용 순서
1. 기존 `andamiro-staff` 폴더에 이 ZIP 내용 전체 덮어쓰기
2. `apps-script.js` 내용을 Google Apps Script에 전체 교체
3. 저장 후 배포 관리에서 새 버전 배포
4. GitHub Desktop에서 Commit → Push
5. Vercel 자동 배포 확인

## 테스트
- `npm ci` 성공
- `npm run build` 성공
