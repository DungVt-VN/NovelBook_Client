import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Comment.scss'; // Đảm bảo bạn import file CSS

const Comment = () => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [value, setValue] = useState('');
  const [isComment, setIsComment] = useState(false);

  const availableImages = [
    'url/to/image1.jpg',
    'url/to/image2.jpg',
    'url/to/image3.jpg',
    // Thêm các URL ảnh khác
  ];

  const handleImageSelect = (imageUrl: string) => {
    const quillEditor = quillRef.current?.getEditor();
    const range = quillEditor?.getSelection(true);
    if (quillEditor && range) {
      quillEditor.insertEmbed(range.index, 'image', imageUrl, 'user');

      // Lấy tất cả ảnh trong editor và đặt kích thước cho ảnh mới chèn
      const editor = quillEditor.root;
      const images = editor.getElementsByTagName('img');
      if (images.length > 0) {
        const img = images[images.length - 1];
        img.style.width = '50px';
        img.style.height = 'auto';
      }

      quillEditor.setSelection({ index: range.index + 1, length: 0 });
    }
  };

  return (

    <div className='m-5'>
      {
        !isComment ?
          <div className='bg-white text-gray-500 w-full h-20 p-3 border border-black rounded-lg' onClick={() => { setIsComment(true) }}>
            Viết bình luận của bạn ...
          </div> :
          <div>
            <div className='container'>
              <div className='image-gallery'>
                {availableImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Available ${index}`}
                    onClick={() => handleImageSelect(image)}
                    className='selectable-image'
                  />
                ))}
              </div>
              <ReactQuill
                ref={quillRef}
                value={value}
                onChange={setValue}
                className='editor'
                modules={{
                  toolbar: false,
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={['image', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet']}
              />
            </div>
          </div>
      }

    </div>


  );
};

export default Comment;