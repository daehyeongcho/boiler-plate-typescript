import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/userAction";

export default function Auth<T extends RouteComponentProps>(
  SpecificComponent: React.ComponentType<T>,
  option: boolean | null,
  adminRoute = null
) {
  // option
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props: T) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);

        // 로그인하지 않은 상태
        if (!res.payload.data.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !res.payload.data.isAdmin) {
            props.history.push("/");
          } else {
            if (!option) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);

    return <SpecificComponent {...(props as T)} />;
  }
  return AuthenticationCheck;
}
