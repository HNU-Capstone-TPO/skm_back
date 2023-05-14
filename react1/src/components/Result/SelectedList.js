import Box from '@mui/material/Box';

const SelectedList = ({ selectedProducts }) => {
  const category = ['상의', '하의', '신발', '모자', '아우터', '부위테스트'];
    return(
       
      <div>
        <Box 
          sx={{
            width: 500,
            height: 200,
            border: 1,
            borderRadius: '16px'
         }}>
        {selectedProducts.map((product, index) =>
          product ? (
            <div key={index}>
                Selected {category[index]}: {product.name}
                Price: {product.price}
            </div>
          ) : null
        )}
        </Box>
      </div>
    );
};
export default SelectedList;