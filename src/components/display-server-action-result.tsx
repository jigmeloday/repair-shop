type Props = {
  result: {
    data?: {
      message: string,
    },
    serverError?: string,
    validationErrors?: Record<string, string[]>,
  }
}

const MessageBox = ({
  type,
  content,
}: {
  type: 'success' | 'error' | 'warning',
  content: string,
}) => {
  return(
    <div className={`bg-accent px-4 py-2 my-2 rounded-lg ${type === 'error' ? 'text-red-500' : ''}`} role="alert">
      {type === 'success' ? '🎉' : '🚨'} {content}
    </div>
  )
}

export default function DisplayServerActionResult({ result }: Props) {
  const { data, serverError, validationErrors } = result;

  if (serverError) {
    return (
      <MessageBox type="error" content={`Server error: ${serverError}`} />
    )
  }

  if (validationErrors) {
    return (
      <MessageBox type="error" content={`Validation error: ${JSON.stringify(validationErrors)}`} />
    )
  }

  if (data?.message) {
    return (
      <MessageBox type="success" content={data.message} />
    )
  }

  return null;
}