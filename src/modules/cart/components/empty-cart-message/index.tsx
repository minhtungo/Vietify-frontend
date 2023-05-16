import Link from '@common/link';
import EmptyState from '@modules/common/components/empty-state';
import { buttonVariants } from '@ui/button';

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
