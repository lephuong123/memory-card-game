# Yêu cầu
Viết script Bash để tự động hóa Git commit và push lên GitHub.

## Các bước
1. Thêm tất cả file thay đổi (`git add .`).
2. Tạo commit message tự động: kết hợp tên nhánh hiện tại + tóm tắt ngắn gọn nội dung thay đổi (không liệt kê từng file).
3. Push code lên nhánh hiện tại (`git push origin <branch>`).

## Ví dụ mong muốn
- **Nhánh:** `feature/add-login`
- **File thay đổi:** `login.js`, `style.css`, `auth.js` (hoặc nhiều file hơn)
- **Commit message:** `feature/add-login: Add login functionality`