# Feature Spec

## 1. Summary
- Tên feature: Theme list with UI panel for Todo app
- Mục tiêu: cho user chọn theme trực tiếp từ một panel trên UI thay vì chỉ bấm toggle vòng lặp.
- Giá trị cho user: dễ nhìn, dễ chọn, có nhiều mood rõ ràng hơn như galaxy, cute, normal.

## 2. Context
- Project/module liên quan: `/root/.openclaw/workspace/todo-app`
- Hiện trạng: app đã có dark, light, galaxy và một nút toggle theme.
- Vấn đề đang có: theme switch hiện không trực quan; user muốn một danh sách theme rõ ràng và panel đổi theme trên UI.

## 3. Scope
### In scope
- Thêm panel/theme picker trên UI
- Có danh sách theme ít nhất gồm: `normal`, `galaxy`, `cute`
- `normal` nên là theme mặc định/an toàn, tương ứng visual trung tính của app
- Theme panel phải usable trên mobile
- Theme được lưu trong localStorage
- Có highlight theme đang active

### Out of scope
- Không thêm backend
- Không thêm animation nặng
- Không đổi core tính năng todo
- Không thêm framework/build step mới

## 4. Functional requirements
- [ ] User mở/nhìn thấy panel đổi theme trên UI
- [ ] User chọn được một theme từ list
- [ ] Theme áp dụng ngay sau khi chọn
- [ ] Theme đã chọn được lưu lại và khôi phục sau reload
- [ ] Theme list có ít nhất: `normal`, `galaxy`, `cute`
- [ ] Nếu đã có `dark` và `light`, có thể giữ như mode nền hoặc gộp hợp lý, nhưng UI phải rõ ràng và không rối

## 5. UX / UI requirements
- Panel đổi theme phải nhìn gọn, premium, hợp phong cách app
- Trên desktop: panel nên dễ thấy ở vùng header/hero hoặc khu settings nhỏ
- Trên mobile: panel không được chật, không overflow ngang
- Mỗi theme option nên có label rõ, có thể có preview swatch/chip nhỏ
- Theme active phải nhìn ra ngay
- `cute` nên có cá tính mềm hơn, sáng sủa/dễ thương hơn nhưng vẫn readable
- `galaxy` giữ vibe cosmic nổi bật
- `normal` là kiểu sạch, cân bằng, dễ dùng hằng ngày

## 6. Technical constraints
- Stack / framework: plain HTML/CSS/JS
- Không được đụng tới: deploy model, static architecture cơ bản
- Giới hạn hiệu năng / compatibility: JS nhẹ, CSS rõ ràng, không phụ thuộc thư viện ngoài

## 7. Data / state / API
- Input: user chọn theme từ panel
- Output: UI đổi theme tức thì
- Storage: localStorage theme preference
- API / integration liên quan: none

## 8. Acceptance criteria
- [ ] Có panel đổi theme trên UI
- [ ] Có ít nhất 3 theme rõ ràng: normal, galaxy, cute
- [ ] Theme active được highlight
- [ ] Reload vẫn giữ theme đã chọn
- [ ] Không lỗi JS syntax
- [ ] Mobile responsive vẫn ổn

## 9. Test checklist
- [ ] Happy path
- [ ] Edge cases
- [ ] Mobile / responsive
- [ ] Theme persistence
- [ ] Visual contrast/readability

## 10. Notes for Codex
- Dùng spec này làm source of truth
- Ưu tiên thay đổi gọn và nhất quán với app hiện tại
- Nếu cần hợp nhất dark/light/normal, giải thích assumption ngắn ở cuối
- Sau khi xong, chạy self-check và tóm tắt thay đổi
