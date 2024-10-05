import React, { createContext, useContext, ReactNode } from 'react';
// import { useAddress, useMetamask } from '@thirdweb-dev/react';
import { createThirdwebClient, defineChain, getContract } from 'thirdweb';
import { scrollSepoliaTestnet } from 'thirdweb/chains';
import { useReadContract } from 'thirdweb/react';

// Define types for contract responses
interface ReviewForm {
  restaurantId: number;
  reviewText: string;
  imageLink: string;
}

interface VoteReviewForm {
  restaurantId: number;
  reviewIndex: number;
  isUpvote: boolean;
}

interface StateContextProviderProps {
  children: ReactNode;
}

// Create context
const StateContext = createContext<any>(null);

export const StateContextProvider = ({ children }: StateContextProviderProps) => {
  // Initialize Thirdweb client
  const client = createThirdwebClient({ clientId: "ea6848c5d936b0dc84de9a3a9bdf4209" });
  
  // connect to your contract
  const contract = getContract({
    client,
    chain: defineChain(534351),
    address: "0xE68501AA2ffeC1a3542686AAD5F850176166c204"
  });
   
  const { data: reviews, isPending: isReviewsLoading, error } = useReadContract({
    contract,
    method: "function getRestaurantReviews(uint256 _restaurantId) view returns ((address reviewer, string reviewText, string imageLink, int256 voteCount, uint256 timestamp)[])",
    params: [0n]
  });

  // Check for errors in the contract call
  if (error) {
    console.error("Error fetching reviews:", error);
  }

  return (
    <StateContext.Provider
      value={{
        reviews,  // Expose reviews if needed in the UI
        isReviewsLoading, // Expose loading state for reviews
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Export custom hook
export const useStateContext = () => useContext(StateContext);