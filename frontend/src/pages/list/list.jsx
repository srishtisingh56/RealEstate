import './list.scss'
import Card from"../../pages/card/card"
import {listData} from"../../lib/dummydata"

function List({posts}){
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List