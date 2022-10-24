type TTagProps = {
  text: string
}

const Tag = ({ text }: TTagProps) => {
  return (
    <span className="text-white text-[0.6rem] font-semibold lowercase rounded px-1 py-0.5 bg-primary-400 hover:bg-primary-500 cursor-pointer">
      #{text.replaceAll(' ', '-')}
    </span>
  )
}

export default Tag
