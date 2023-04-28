import Box from '@mui/material/Box';

const SelectedList = ({ selectedProducts }) => {
  const category = ['hat', 'top', 'bottom', 'shoes'];
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
                Selected {category[index]}: {product.title}
            </div>
          ) : null
        )}
        </Box>
      </div>
    );
};
export default SelectedList;