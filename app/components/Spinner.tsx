import SquareLoader from 'react-spinners/SquareLoader'

export default function Spinner({ text }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <span className="block p-4">
        <SquareLoader color="#eb4747" size={60} />
      </span>
      <p className="px-2 text-center text-lg text-gray-800">{text}</p>
    </div>
  )
}

interface Props {
  text: string
}
