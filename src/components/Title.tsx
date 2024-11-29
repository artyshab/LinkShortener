type TitleProp = {
    title : string
}

export default function Title({title}:TitleProp) {
    return (
        <>
         <div className="title">
          <h1>{title}</h1>
        </div>
        </>
    )
}