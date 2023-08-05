import Skeleton from 'react-loading-skeleton';

// SKELETON LOADER FOR JOBS (APPLIED JOBS) COMPONENT
export const AppliedJobSkeleton = ({ cards }) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='applied-job-skeleton' key={index}>
              <Skeleton count={3} style={{ marginBottom: `0.5rem` }} />
            </div>
          );
        })}
    </>
  );
};
