# Feature Spec

## 1. Summary
- Tên feature: Galaxy Mood theme for Todo app
- Mục tiêu: thêm một mood/theme kiểu galaxy cho app todo list để giao diện có cảm giác cosmic, nổi bật, thú vị hơn theme hiện tại.
- Giá trị cho user: app nhìn đẹp hơn, có personality hơn, tăng cảm giác thích dùng.

## 2. Context
- Project/module liên quan: `/root/.openclaw/workspace/todo-app`
- Hiện trạng: app đã có dark/light theme toggle, dashboard, task list, responsive mobile.
- Vấn đề đang có: visual hiện tại vẫn còn khá generic; user muốn một mood/theme “galaxy”.

## 3. Scope
### In scope
- Thêm một biến thể giao diện “Galaxy mood” rõ rệt về nền, màu, hiệu ứng, accent
- Giữ nguyên tất cả tính năng hiện có
- Cập nhật UI toggle/theme picker để có thể chọn được Galaxy mood
- Theme preference phải được lưu lại
- Responsive mobile không bị vỡ

### Out of scope
- Không thêm backend
- Không đổi kiến trúc app
- Không thêm framework/build step mới
- Không biến app thành animation nặng hoặc game hóa quá đà

## 4. Functional requirements
- [ ] User có thể chuyển sang Galaxy mood từ UI
- [ ] Galaxy mood được persist trong localStorage như các theme khác
- [ ] App khởi động lại vẫn nhớ đúng mood đã chọn
- [ ] Nếu chưa có preference, app vẫn fallback hợp lý như hiện tại

## 5. UX / UI requirements
- Galaxy mood phải có cảm giác cosmic / neon / space nhưng vẫn readable
- Không hy sinh contrast và usability để lấy hiệu ứng màu mè
- Hero, cards, badges, buttons, progress bar, nền tổng thể đều cần đồng bộ với mood mới
- Trên mobile vẫn gọn, không rối, không overflow ngang

## 6. Technical constraints
- Stack / framework: plain HTML/CSS/JS
- Không được đụng tới: deploy model, Vercel static structure cơ bản
- Giới hạn hiệu năng / bảo mật / compatibility: hiệu ứng nhẹ, không phụ thuộc thư viện ngoài, không thêm JS animation nặng

## 7. Data / state / API
- Input: theme selection từ user
- Output: UI đổi sang galaxy mood
- Storage: localStorage cho theme preference
- API / integration liên quan: none

## 8. Acceptance criteria
- [ ] Có thể chọn ít nhất 3 mood/theme: dark, light, galaxy
- [ ] Galaxy mood nhìn khác biệt rõ ràng với dark/light
- [ ] Theme switch hoạt động ổn với localStorage persistence
- [ ] Không lỗi JS syntax
- [ ] Mobile responsive vẫn ổn

## 9. Test checklist
- [ ] Happy path
- [ ] Edge cases
- [ ] Mobile / responsive
- [ ] Dark/light theme
- [ ] Galaxy mood selection + persistence

## 10. Notes for Codex
- Nếu spec mơ hồ, liệt kê assumption ngắn ở cuối
- Ưu tiên sửa tối thiểu nhưng ra chất galaxy thật sự
- Không tự ý thêm feature ngoài spec
- Sau khi xong, chạy self-check và tóm tắt rõ thay đổi
