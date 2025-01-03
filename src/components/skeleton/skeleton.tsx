import { Col, Skeleton } from "antd";

export const SkeletonComponent = () => {
  const skeletonArray = [1, 2, 3, 4, 5];
  return (
    <>
      {skeletonArray.map((_, index) => (
        <Col span={24} key={index} className="mt-2">
          <div
            style={{
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* UserId Skeleton */}
              <div
                style={{
                  textAlign: "center",
                  borderRight: "2px solid #ddd",
                  paddingRight: "10px",
                }}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "80%",
                    borderRadius: "8px",
                    margin: "0 auto",
                  }}
                />
              </div>

              {/* CustomerName Skeleton */}
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: "2px solid #ddd",
                  paddingRight: "10px",
                }}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "80%",
                    borderRadius: "8px",
                    margin: "0 auto",
                  }}
                />
              </div>

              {/* paidUnpaid Skeleton */}
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: "2px solid #ddd",
                  paddingRight: "10px",
                }}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "50%",
                    borderRadius: "8px",
                    margin: "0 auto",
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: "2px solid #ddd",
                  paddingRight: "10px",
                }}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "50%",
                    borderRadius: "8px",
                    margin: "0 auto",
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: "2px solid #ddd",
                  paddingRight: "10px",
                }}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "70%",
                    borderRadius: "8px",
                    margin: "0 auto",
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "60%",
                    borderRadius: "8px",
                    margin: "0 auto",
                  }}
                />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};
