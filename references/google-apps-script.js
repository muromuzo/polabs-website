// Google Apps Script - POLABS 문의 폼
// 1. script.google.com 에서 새 프로젝트 생성
// 2. 이 코드를 붙여넣기
// 3. 배포 → 새 배포 → 웹 앱 → 액세스: 모든 사용자 → 배포
// 4. 웹 앱 URL을 복사해서 알려주세요

const NOTIFY_EMAIL = 'inc.polabs@gmail.com';
const SHEET_NAME = 'POLABS 문의';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 스프레드시트에 저장
    let ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      ss = SpreadsheetApp.create(SHEET_NAME);
    }
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // 헤더 (처음 한 번)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['접수일시', '문의유형', '병원명/성함', '진료과목', '위치', '상세내용', '성함', '연락처', '이메일']);
    }

    // 데이터 추가
    sheet.appendRow([
      new Date().toLocaleString('ko-KR'),
      data.serviceType || '',
      data.company || '',
      data.budget || '',
      data.deadline || '',
      data.details || '',
      data.name || '',
      data.phone || '',
      data.email || ''
    ]);

    // 이메일 알림 발송
    const subject = '[POLABS] 새 문의 접수 - ' + (data.name || '미입력');
    const body = `
새로운 문의가 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━
■ 문의 유형: ${data.serviceType || '-'}
■ 병원명/성함: ${data.company || '-'}
■ 진료과목: ${data.budget || '-'}
■ 위치: ${data.deadline || '-'}
■ 상세 내용: ${data.details || '-'}
━━━━━━━━━━━━━━━━━━━━
■ 성함: ${data.name || '-'}
■ 연락처: ${data.phone || '-'}
■ 이메일: ${data.email || '-'}
━━━━━━━━━━━━━━━━━━━━
접수일시: ${new Date().toLocaleString('ko-KR')}
`;

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('POLABS Form API is running.');
}
