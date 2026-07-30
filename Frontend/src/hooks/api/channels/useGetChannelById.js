import { useQuery } from "@tanstack/react-query";

import { getChannelById } from "@/api/channels";
import { useAuth } from "@/hooks/context/useAuth";

export const useGetChannelById = (channelId) => {
  const { auth } = useAuth();

  const { data: channelDetails, isError, isFetching } = useQuery({
    queryKey: ["getChannelById", channelId],
    queryFn: () => getChannelById({ channelId, token: auth?.token }),
    enabled: Boolean(channelId && auth?.token),
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  return { channelDetails, isError, isFetching };
};
