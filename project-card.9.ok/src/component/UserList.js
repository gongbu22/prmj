import './UserListModule.css';
import {MdAccountBox, MdPlace, MdDateRange, MdOutlineContentPaste, MdOutlineCategory} from 'react-icons/md';

const UserList =({list}) => {
    return (
        <div>
            <h2>사용자추가목록<MdAccountBox /></h2>
            <div>
                {list.map((list)=> (
                    <div className='userlist'>
                        <div><MdOutlineCategory />카테고리: {list.EVENT_CATEGORY}</div>
                        <div>{list.EVENT_NAME}</div>
                        <div>{list.PICTURE==="Y" ? <h1><MdOutlineCategory />승인</h1>:<h1><MdDateRange />승인요청중</h1>}</div>
                        <div><MdDateRange />행사날짜: {list.EVENT_BEGIN_DATE} ~ {list.EVENT_END_DATE}</div>
                        
                    </div>
                ))}
            </div>
        </div>
        
        );
};

export default UserList;