# Yêu cầu
Viết script Bash để tự động hóa Git commit và push lên GitHub.

## Các bước
1. Thêm tất cả file thay đổi (`git add .`).
2. Tạo commit message tự động: kết hợp tên nhánh hiện tại + mô tả ngắn gọn nội dung thay đổi (dựa trên file changes).
3. Push code lên nhánh hiện tại (`git push origin <branch>`).

## Ví dụ mong muốn
- **Nhánh:** `feature/add-login`
- **File thay đổi:** `login.js`, `style.css`
- **Commit message:** `feature/add-login: Update login.js and style.css`