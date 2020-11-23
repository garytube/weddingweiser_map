import React from 'react';


const Marker = (props: any) => {
  return (
    <>
      {props?.status == 'unpublished' ?
        <div className="w-4 h-4 rounded-full bg-wedding opacity-80">
          {props.children}
        </div>
        : <div className="w-5 h-5 rounded-full bg-blue-600 opacity-80">
          {/* {props.children} */}
        </div>
      }
    </>
  );
};


export default Marker