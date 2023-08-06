import Skeleton from 'react-loading-skeleton';

// SKELETON LOADER FOR JOB CARDS
export const JobCardSkeleton = ({ cards }) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='job-card-skeleton' key={index}>
              <Skeleton count={3} style={{ marginBottom: `0.5rem` }} />
            </div>
          );
        })}
    </>
  );
};

// SKELETON LOADER FOR JOB DETAILS

export const JobDetailsSkeleton = () => {
  return (
    <div className='job-details-skeleton'>
      <Skeleton className='company' />
      <Skeleton className='job-title' />

      <div className='location-time'>
        <Skeleton className='location' />
        <Skeleton className='time' />
      </div>

      <div className='btns'>
        <Skeleton className='btn' />
        <Skeleton className='btn' />
      </div>

      <Skeleton className='job-description' />
      <Skeleton className='info' count={5} />
    </div>
  );
};
