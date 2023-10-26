<div className="flex flex-col items-center justify-center h-screen">
<div className="w-80 border-2 rounded-lg" style={{ backgroundColor: '#030712' }}>
  {/* Conditionally render the spinner if loading is true */}
  {loading ? (
    <Spinner />
  ) : (
    <>
      {/* Rest of your code remains the same */}
    </>
  )}
</div>
</div>