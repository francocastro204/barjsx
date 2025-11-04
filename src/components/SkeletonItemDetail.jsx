import { Card, CardBody, Skeleton } from '@heroui/react';

const SkeletonItemDetail = () => {
    return (
        <Card shadow="sm" className='bg-white'>
            <CardBody className="overflow-visible p-0 flex flex-row">
                <div className='w-1/3'>
                    <div className='pl-4 pt-4 pb-4'>
                        <Skeleton className="rounded-xl w-full h-48">
                            <div className="h-48 w-full rounded-xl bg-default-300" />
                        </Skeleton>
                    </div>
                </div>
                <div className="w-2/3">
                    <div className="p-4">
                        <div>
                            <Skeleton className="w-4/5 rounded-lg mb-3">
                                <div className="h-6 w-4/5 rounded-lg bg-default-200" />
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg mb-9">
                                <div className="h-5 w-2/5 rounded-lg bg-default-300" />
                            </Skeleton>
                        </div>
                        <div className="mb-4">
                            <div className="space-y-2">
                                <Skeleton className="w-full rounded-lg">
                                    <div className="h-3 w-full rounded-lg bg-default-200" />
                                </Skeleton>
                                <Skeleton className="w-3/4 rounded-lg">
                                    <div className="h-3 w-3/4 rounded-lg bg-default-200" />
                                </Skeleton>
                            </div>
                        </div>
                        <div>
                            <Skeleton className="w-2/5 rounded-3xl">
                                <div className="h-9 rounded-3xl bg-default-200 pl-2" />
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default SkeletonItemDetail;
