# Yêu cầu
Script Bash này tự động hóa quá trình commit và push lên GitHub, với commit message được tạo tự động dựa trên nhánh và tóm tắt thay đổi.

## Các bước thực hiện
1. Thêm tất cả thay đổi vào staging (`git add .`).
2. Tự động tạo commit message:
   - Lấy tên nhánh hiện tại.
   - Tóm tắt thay đổi (số file thay đổi + loại thay đổi dựa trên tên nhánh).
   - Không yêu cầu người dùng nhập tay.
3. Push code lên nhánh hiện tại (`git push origin <branch>`).
4. Tự động thêm lệnh vào terminal `./.github/push_current_branch.sh`

## Ví dụ mong muốn
- **Nhánh:** `feature/add-login`
- **File thay đổi:** `login.js`, `style.css`, `auth.js` (hoặc nhiều file hơn)

### Cách chạy:
- Lưu vào `commit-push.sh`, cấp quyền `chmod +x commit-push.sh`, rồi chạy `./commit-push.sh`.