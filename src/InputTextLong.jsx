import cx from 'classnames'

export default function InputTextLong({name, help, label, className, ...props}) {
  return (
    <div className='mb-2'>
      <div className='flex gap-2 items-center'>
        {!!label && <label className='w-12' htmlFor={name}>{label}</label>}
        <div className='w-full'>
          <textarea name={name} type="text" className={cx(className, 'bg-black text-white border w-full p-2 outline-white')} {...props} />
          {!!help && <div className='text-sm'>{help}</div>}
        </div>
      </div>
    </div>
    )
}