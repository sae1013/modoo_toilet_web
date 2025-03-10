'use client';

import React, { useEffect, useRef } from 'react';
import { ReverseGeocodeResponse, ServiceStatus, ReverseGeocodeAddress } from '@api/naver_map';
import { makeAddress } from '@/lib/map_utils';

interface NaverMapProps {
  width?: string | number;
  height?: string | number;
  lat?: number;
  lng?: number;
  zoom?: number;
  onClick?: (addresses: string[]) => void;
}

const NaverMap = ({ width = '100%', height = '100vh', lat = 37.511337, lng = 127.012084, zoom = 15, onClick }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    const { naver } = window;
    if (!naver || !mapRef.current) {
      return;
    }
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(lat, lng),
      zoom,
      mapTypeControl: false,
    });

    let infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true,
    });

    window.map = map;
    window.infoWindow = infoWindow;

    let marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map,
    });
    map.setCursor('pointer');
  };

  const onClickMapListener = async (e: { coord: object }) => {
    const selectedAddrInfo: object = await searchCoordinateToAddress(e.coord);
    const coordInfo = await searchAddressToCoord(selectedAddrInfo);
    console.log(coordInfo);
    if (onClick) {
      onClick({ ...selectedAddrInfo, ...coordInfo });
    }
  };
  const initGeocoder = () => {
    window.map.addListener('click', onClickMapListener);
  };

  const searchAddressToCoord = async (addressInfo) => {
    const { naver } = window;
    const { jibunAddress, roadAddress } = addressInfo;
    return new Promise((resolve, reject) => {
      naver.maps.Service.geocode(
        {
          query: roadAddress || jibunAddress,
        },
        (status, response) => {
          console.log(status, response);
          resolve({ lat: response.v2.addresses[0].x, lng: response.v2.addresses[0].y });
        },
      );
    });
  };

  // 클릭한 위치좌표를 기반으로 주소 획득
  const searchCoordinateToAddress = async (latlng: object): Promise<object> => {
    const { infoWindow, map, naver } = window;
    infoWindow.close();
    let addresses: string[] = [];

    return new Promise((resolve, reject) => {
      naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(','),
        },
        async function (status: 200 | 500, response: ReverseGeocodeResponse) {
          if (status === naver.maps.Service.Status.ERROR) {
            reject('존재하지 않는 주소');
          }
          console.log(response.v2);
          const items = response.v2.results;
          const selectedCoordInfo = {
            jibunAddress: response.v2.address.jibunAddress || '',
            roadAddress: response.v2.address.jibunAddress || '',
          };
          resolve(selectedCoordInfo);
        },
      );
    });
  };

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
      initGeocoder();
    } else {
      window.addEventListener('load', initMap);
      return () => {
        window.removeEventListener('load', initMap);
        window.map.removeListener('click');
      };
    }
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width, height }}></div>
    </>
  );
};

export default NaverMap;
