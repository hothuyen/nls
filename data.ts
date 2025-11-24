import { CompetencyGroup } from './types';

export const NLS_DATA: CompetencyGroup[] = [
  {
    id: '1',
    title: '1. Khai thác dữ liệu và thông tin',
    shortTitle: 'Khai thác dữ liệu',
    iconName: 'Database',
    subCompetencies: [
      {
        id: '1.1',
        title: 'Duyệt, tìm kiếm và lọc dữ liệu, thông tin, nội dung số',
        indicators: [
          { id: 'a', description: 'Đáp ứng được nhu cầu thông tin' },
          { id: 'b', description: 'Áp dụng được kỹ thuật tìm kiếm để lấy được dữ liệu, thông tin và nội dung trong môi trường số' },
          { id: 'c', description: 'Chỉ cho người khác cách truy cập những dữ liệu, thông tin và nội dung này cũng như điều hướng giữa chúng' },
          { id: 'd', description: 'Tự đề xuất được chiến lược tìm kiếm' },
        ],
      },
      {
        id: '1.2',
        title: 'Đánh giá dữ liệu, thông tin và nội dung số',
        indicators: [
          { id: 'a', description: 'Thực hiện đánh giá được độ tin cậy và độ xác thực của các nguồn dữ liệu, thông tin và nội dung số' },
          { id: 'b', description: 'Tiến hành đánh giá được các dữ liệu, thông tin và nội dung số khác nhau' },
        ],
      },
      {
        id: '1.3',
        title: 'Quản lý dữ liệu, thông tin và nội dung số',
        indicators: [
          { id: 'a', description: 'Thao tác được thông tin, dữ liệu và nội dung để tổ chức, lưu trữ và truy xuất dễ dàng hơn' },
          { id: 'b', description: 'Triển khai được việc tổ chức và sắp xếp dữ liệu, thông tin và nội dung trong môi trường có cấu trúc' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: '2. Giao tiếp và Hợp tác',
    shortTitle: 'Giao tiếp & Hợp tác',
    iconName: 'Users',
    subCompetencies: [
      {
        id: '2.1',
        title: 'Tương tác thông qua công nghệ số',
        indicators: [
          { id: 'a', description: 'Sử dụng được nhiều công nghệ số để tương tác' },
          { id: 'b', description: 'Cho người khác thấy phương tiện giao tiếp số phù hợp nhất cho một bối cảnh cụ thể' },
        ],
      },
      {
        id: '2.2',
        title: 'Chia sẻ thông tin và nội dung thông qua công nghệ số',
        indicators: [
          { id: 'a', description: 'Chia sẻ dữ liệu, thông tin và nội dung số thông qua nhiều công cụ số phù hợp' },
          { id: 'b', description: 'Hướng dẫn người khác cách đóng vai trò trung gian để chia sẻ thông tin và nội dung thông qua công nghệ số' },
          { id: 'c', description: 'Áp dụng được nhiều phương pháp tham chiếu và ghi nguồn khác nhau' },
        ],
      },
      {
        id: '2.3',
        title: 'Sử dụng công nghệ số để thực hiện trách nhiệm công dân',
        indicators: [
          { id: 'a', description: 'Đề xuất được các dịch vụ số khác nhau để tham gia vào xã hội' },
          { id: 'b', description: 'Sử dụng được các công nghệ số thích hợp để tự mình trang bị và tham gia vào xã hội như một công dân' },
        ],
      },
      {
        id: '2.4',
        title: 'Hợp tác thông qua công nghệ số',
        indicators: [
          { id: 'a', description: 'Đề xuất được các công cụ và công nghệ số khác nhau cho các quá trình hợp tác' },
        ],
      },
      {
        id: '2.5',
        title: 'Quy tắc ứng xử trên mạng',
        indicators: [
          { id: 'a', description: 'Áp dụng được các chuẩn mực hành vi và bí quyết khác nhau khi sử dụng công nghệ số và tương tác trong môi trường số' },
          { id: 'b', description: 'Áp dụng được các chiến lược giao tiếp khác nhau trong môi trường số một cách phù hợp' },
          { id: 'c', description: 'Áp dụng được các khía cạnh đa dạng về văn hóa và thế hệ khác nhau để xem xét trong môi trường số' },
        ],
      },
      {
        id: '2.6',
        title: 'Quản lý danh tính số',
        indicators: [
          { id: 'a', description: 'Sử dụng được nhiều danh tính số khác nhau' },
          { id: 'b', description: 'Áp dụng được các cách khác nhau để bảo vệ danh tính trực tuyến của bản thân' },
          { id: 'c', description: 'Sử dụng được dữ liệu tạo ra thông qua công cụ, môi trường và một số dịch vụ số' },
        ],
      },
    ],
  },
  {
    id: '3',
    title: '3. Sáng tạo nội dung số',
    shortTitle: 'Sáng tạo nội dung',
    iconName: 'PenTool',
    subCompetencies: [
      {
        id: '3.1',
        title: 'Phát triển nội dung số',
        indicators: [
          { id: 'a', description: 'Áp dụng được các cách tạo và chỉnh sửa nội dung ở các định dạng khác nhau' },
          { id: 'b', description: 'Chỉ ra được những cách thể hiện bản thân thông qua việc tạo ra các nội dung số' },
        ],
      },
      {
        id: '3.2',
        title: 'Tích hợp và tạo lập lại nội dung số',
        indicators: [
          { id: 'a', description: 'Làm việc với các mục nội dung và thông tin mới khác nhau, sửa đổi, tinh chỉnh, cải thiện và tích hợp chúng để tạo ra những mục mới và độc đáo' },
          { id: 'b', description: 'Giải quyết vấn đề qua xử lý nhận thức cá nhân & tập thể (Theo ngữ cảnh)' }, 
        ],
      },
      {
        id: '3.3',
        title: 'Thực thi bản quyền và giấy phép',
        indicators: [
          { id: 'a', description: 'Áp dụng được các quy định khác nhau về bản quyền và giấy phép cho dữ liệu, thông tin và nội dung số' },
        ],
      },
      {
        id: '3.4',
        title: 'Lập trình',
        indicators: [
          { id: 'a', description: 'Tự thao tác được bằng các hướng dẫn dành cho hệ thống máy tính để giải quyết một vấn đề khác nhau hoặc thực hiện các nhiệm vụ khác nhau' },
        ],
      },
    ],
  },
  {
    id: '4',
    title: '4. An toàn',
    shortTitle: 'An toàn',
    iconName: 'ShieldCheck',
    subCompetencies: [
      {
        id: '4.1',
        title: 'Bảo vệ thiết bị',
        indicators: [
          { id: 'a', description: 'Áp dụng được các cách khác nhau để bảo vệ thiết bị và nội dung số' },
          { id: 'b', description: 'Nhận thức được sự đa dạng của các rủi ro và đe dọa trong môi trường số' },
          { id: 'c', description: 'Áp dụng được các biện pháp an toàn và bảo mật' },
          { id: 'd', description: 'Sử dụng được các cách thức khác nhau để quan tâm đến mức độ tin cậy và quyền riêng tư' },
        ],
      },
      {
        id: '4.2',
        title: 'Bảo vệ dữ liệu cá nhân và quyền riêng tư',
        indicators: [
          { id: 'a', description: 'Áp dụng được các cách thức khác nhau để bảo vệ dữ liệu cá nhân và quyền riêng tư trong môi trường số' },
          { id: 'b', description: 'Áp dụng được các cách thức đặc thù để chia sẻ dữ liệu cá nhân một cách an toàn' },
          { id: 'c', description: 'Giải thích được các tuyên bố trong chính sách quyền riêng tư về cách sử dụng dữ liệu cá nhân trong các dịch vụ số' },
        ],
      },
      {
        id: '4.3',
        title: 'Bảo vệ sức khỏe và an sinh số',
        indicators: [
          { id: 'a', description: 'Trình bày được các cách thức khác nhau để tránh rủi ro và đe dọa đến sức khỏe thể chất và tinh thần khi sử dụng công nghệ số' },
          { id: 'b', description: 'Áp dụng được các cách thức khác nhau để bảo vệ bản thân và người khác khỏi nguy cơ trong môi trường số' },
          { id: 'c', description: 'Trình bày được các công nghệ số khác nhau giúp tăng cường thịnh vượng xã hội và sự hòa hợp trong xã hội' },
        ],
      },
      {
        id: '4.4',
        title: 'Bảo vệ môi trường',
        indicators: [
          { id: 'a', description: 'Trình bày được các cách thức khác nhau để bảo vệ môi trường khỏi tác động của công nghệ số và việc sử dụng công nghệ số' },
        ],
      },
    ],
  },
  {
    id: '5',
    title: '5. Giải quyết vấn đề',
    shortTitle: 'Giải quyết vấn đề',
    iconName: 'Zap',
    subCompetencies: [
      {
        id: '5.1',
        title: 'Giải quyết các vấn đề kỹ thuật',
        indicators: [
          { id: 'a', description: 'Đánh giá được các vấn đề kỹ thuật khi sử dụng môi trường số và vận hành các thiết bị số' },
          { id: 'b', description: 'Áp dụng được các giải pháp khác nhau cho chúng' },
        ],
      },
      {
        id: '5.2',
        title: 'Xác định nhu cầu và giải pháp công nghệ',
        indicators: [
          { id: 'a', description: 'Đánh giá được nhu cầu cá nhân' },
          { id: 'b', description: 'Áp dụng được các công cụ số khác nhau và các giải pháp công nghệ có thể có để giải quyết những nhu cầu đó' },
          { id: 'c', description: 'Sử dụng được các cách khác nhau để điều chỉnh và tùy chỉnh môi trường số theo nhu cầu cá nhân' },
        ],
      },
      {
        id: '5.3',
        title: 'Sử dụng sáng tạo công nghệ số',
        indicators: [
          { id: 'a', description: 'Áp dụng được các công cụ và công nghệ số khác nhau để tạo ra kiến thức cũng như các quy trình và sản phẩm đổi mới' },
          { id: 'b', description: 'Áp dụng xử lý nhận thức của cá nhân và tập thể để giải quyết các vấn đề khái niệm và tình huống có vấn đề khác nhau trong môi trường số' },
        ],
      },
      {
        id: '5.4',
        title: 'Xác định các vấn đề cần cải thiện về NLS',
        indicators: [
          { id: 'a', description: 'Chứng minh được NLS của tôi cần được cải thiện hoặc cập nhật ở đâu' },
          { id: 'b', description: 'Minh họa được những cách khác nhau để hỗ trợ người khác phát triển NLS của họ' },
          { id: 'c', description: 'Đề xuất được các cơ hội khác nhau để phát triển bản thân và cập nhật sự phát triển công nghệ số' }
        ],
      },
    ],
  },
  {
    id: '6',
    title: '6. Ứng dụng trí tuệ nhân tạo',
    shortTitle: 'Ứng dụng AI',
    iconName: 'Cpu',
    subCompetencies: [
      {
        id: '6.1',
        title: 'Hiểu biết về trí tuệ nhân tạo',
        indicators: [
          { id: 'a', description: 'Phân tích được cách AI hoạt động trong các ứng dụng cụ thể' },
          { id: 'b', description: 'So sánh được các hệ thống AI khác nhau và cách chúng xử lý dữ liệu' },
        ],
      },
      {
        id: '6.2',
        title: 'Sử dụng trí tuệ nhân tạo',
        indicators: [
          { id: 'a', description: 'Phát triển được các ứng dụng AI tùy chỉnh để giải quyết các vấn đề cụ thể' },
          { id: 'b', description: 'Điều chỉnh được các hệ thống AI để phù hợp với nhu cầu cụ thể' },
          { id: 'c', description: 'Đánh giá và giảm thiểu được các rủi ro đạo đức và pháp lý liên quan đến việc sử dụng AI' },
        ],
      },
      {
        id: '6.3',
        title: 'Đánh giá trí tuệ nhân tạo',
        indicators: [
          { id: 'a', description: 'Đánh giá được độ chính xác và tin cậy của các hệ thống AI' },
          { id: 'b', description: 'Xem xét được các kết quả và đưa ra nhận xét về hiệu quả của hệ thống AI' },
        ],
      },
    ],
  },
];