import EmptyState from '@modules/common/components/empty-state';

const EmptyCartMessage = () => {
  return (
    <EmptyState
      title="Giỏ Hàng Của Bạn Đang Trống"
      subtitle=" Hãy khám phá bộ sưu tập sách phong phú của chúng tôi và thêm chúng vào giỏ hàng!"
      showButton
    />
  );
};

export default EmptyCartMessage;
